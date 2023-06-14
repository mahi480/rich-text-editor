"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRef } from "react";


import { EditorState } from "draft-js";

import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import { MentionData } from "@draft-js-plugins/mention";
import Editor from "@draft-js-plugins/editor";
import createHashtagPlugin from "@draft-js-plugins/hashtag";


import editorStyles from "./SimpleMentionEditor.module.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";


export default function Home() {
  const [mentions, setMentions] = useState<MentionData[]>([
    {
      name: 'Matthew Russell'
    },
    {
      name: 'Julian Krispel-Samsel'
    },
    {
      name: 'Jyoti Puri'
    },
    {
      name: 'Max Stoiber'
    },
    {
      name: 'Nik Graf'
    },
    {
      name: 'Pascal Brandt'
    },
  ]);
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const hashtagPlugin = createHashtagPlugin();

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [hashtagPlugin, mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(
    ({ value }: { value: string }) => {
      console.log("mentions--", mentions);
      setSuggestions(defaultSuggestionsFilter(value, mentions));
    },
    [mentions]
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className={``}
      >
        <div
          className={editorStyles.editor}
          onClick={() => {
            ref.current!.focus();
          }}
        >
          <Editor
            editorKey={"editor"}
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
            ref={ref}
          />
          <MentionSuggestions
            open={open}
            onOpenChange={onOpenChange}
            suggestions={suggestions}
            onSearchChange={onSearchChange}
            onAddMention={() => {
              // get the mention object selected
            }}
          />
        </div>
      </div>
    </main>
  );
}
