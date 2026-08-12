// apps/web/src/components/ui/rich-text-editor.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ============================================
// RICH TEXT EDITOR - WITHOUT SLOT ISSUES
// ============================================
export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here...',
  className,
  readOnly = false,
  minHeight = '150px',
}) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline hover:text-primary/80' },
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
    ],
    content: value || '',
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  const handleAddLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl, target: '_blank' }).run();
      setIsLinkDialogOpen(false);
      setLinkUrl('');
    }
  };

  const handleAddImage = () => {
    if (imageUrl) {
      editor.chain().focus().insertContent({
        type: 'image',
        attrs: { src: imageUrl, alt: imageAlt || 'Image' },
      }).run();
      setIsImageDialogOpen(false);
      setImageUrl('');
      setImageAlt('');
    }
  };

  const MenuButton = ({ onClick, icon: Icon, label, isActive = false, disabled = false }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn('h-8 w-8 p-0', isActive && 'bg-muted text-primary')}
            onClick={onClick}
            disabled={disabled || !editor.isEditable}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b bg-muted/20">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={Bold}
            label="Bold"
            isActive={editor.isActive('bold')}
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={Italic}
            label="Italic"
            isActive={editor.isActive('italic')}
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon={Strikethrough}
            label="Strikethrough"
            isActive={editor.isActive('strike')}
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            icon={Highlighter}
            label="Highlight"
            isActive={editor.isActive('highlight')}
          />
          <div className="w-px h-6 bg-border mx-1" />
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            icon={Heading1}
            label="Heading 1"
            isActive={editor.isActive('heading', { level: 1 })}
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            icon={Heading2}
            label="Heading 2"
            isActive={editor.isActive('heading', { level: 2 })}
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            icon={Heading3}
            label="Heading 3"
            isActive={editor.isActive('heading', { level: 3 })}
          />
          <div className="w-px h-6 bg-border mx-1" />
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={List}
            label="Bullet List"
            isActive={editor.isActive('bulletList')}
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={ListOrdered}
            label="Numbered List"
            isActive={editor.isActive('orderedList')}
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon={Quote}
            label="Quote"
            isActive={editor.isActive('blockquote')}
          />
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            icon={Minus}
            label="Divider"
          />
          <div className="w-px h-6 bg-border mx-1" />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            icon={AlignLeft}
            label="Align Left"
            isActive={editor.isActive({ textAlign: 'left' })}
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            icon={AlignCenter}
            label="Align Center"
            isActive={editor.isActive({ textAlign: 'center' })}
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            icon={AlignRight}
            label="Align Right"
            isActive={editor.isActive({ textAlign: 'right' })}
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            icon={AlignJustify}
            label="Justify"
            isActive={editor.isActive({ textAlign: 'justify' })}
          />
          <div className="w-px h-6 bg-border mx-1" />
          <MenuButton
            onClick={() => setIsLinkDialogOpen(true)}
            icon={LinkIcon}
            label="Add Link"
          />
          <MenuButton
            onClick={() => setIsImageDialogOpen(true)}
            icon={ImageIcon}
            label="Add Image"
          />
          <div className="w-px h-6 bg-border mx-1" />
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={Undo}
            label="Undo"
            disabled={!editor.can().undo()}
          />
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={Redo}
            label="Redo"
            disabled={!editor.can().redo()}
          />
        </div>
      )}

      <div className="p-3" style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLink}>Add Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Image description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddImage}>Add Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RichTextEditor;