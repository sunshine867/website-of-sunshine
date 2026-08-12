'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, List, ListOrdered, Quote, Code, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2 } from 'lucide-react';

const toolbarButtons = [
  { icon: Bold, command: 'bold', label: 'Bold' },
  { icon: Italic, command: 'italic', label: 'Italic' },
  { icon: Underline, command: 'underline', label: 'Underline' },
  { icon: Heading1, command: 'h1', label: 'Heading 1' },
  { icon: Heading2, command: 'h2', label: 'Heading 2' },
  { icon: List, command: 'ul', label: 'Bullet List' },
  { icon: ListOrdered, command: 'ol', label: 'Numbered List' },
  { icon: Quote, command: 'blockquote', label: 'Quote' },
  { icon: Code, command: 'code', label: 'Code' },
  { icon: LinkIcon, command: 'link', label: 'Link' },
  { icon: ImageIcon, command: 'image', label: 'Image' },
];

export default function RichTextEditor({ value, onChange, placeholder = 'Write something...', className }) {
  const handleCommand = (command) => {
    const textarea = document.getElementById('rich-editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = '';
    switch (command) {
      case 'bold': replacement = `**${selectedText || 'bold text'}**`; break;
      case 'italic': replacement = `*${selectedText || 'italic text'}*`; break;
      case 'underline': replacement = `__${selectedText || 'underlined text'}__`; break;
      case 'h1': replacement = `\n# ${selectedText || 'Heading 1'}\n`; break;
      case 'h2': replacement = `\n## ${selectedText || 'Heading 2'}\n`; break;
      case 'ul': replacement = `\n- ${selectedText || 'List item'}\n`; break;
      case 'ol': replacement = `\n1. ${selectedText || 'List item'}\n`; break;
      case 'blockquote': replacement = `\n> ${selectedText || 'Quote'}\n`; break;
      case 'code': replacement = `\`${selectedText || 'code'}\``; break;
      case 'link': replacement = `[${selectedText || 'link text'}](url)`; break;
      case 'image': replacement = `![${selectedText || 'alt text'}](url)`; break;
      default: return;
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    onChange?.(newText);
    textarea.focus();
  };

  return (
    <div className={`border rounded-xl overflow-hidden ${className}`}>
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        {toolbarButtons.map((btn) => (
          <button key={btn.command} onClick={() => handleCommand(btn.command)} className="p-2 rounded hover:bg-gray-200 transition-colors" title={btn.label}>
            <btn.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <textarea id="rich-editor" value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} className="w-full min-h-[300px] p-4 text-sm focus:outline-none resize-y" />
    </div>
  );
}