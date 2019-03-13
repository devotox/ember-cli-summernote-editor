import { observer } from '@ember/object';

import Component from '@ember/component';

import layout from '../templates/components/summernote-editor';

let defaultToolbar = [
  ['fontname', ['fontname']],
  ['fontsize', ['fontsize']],
  ['style', ['style']],
  ['color', ['color']],
  ['height', ['height']],
  ['table', ['table']],
  ['para', ['ul', 'ol', 'paragraph']],
  ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
  ['insert', ['link', 'picture', 'video', 'hr']],
  ['view', ['undo', 'redo', 'codeview', 'fullscreen']]
];

export default Component.extend({
  layout,

  lang: null,
  height: 120,
  focus: false,
  toolbar: null,
  content: null,
  airMode: false,
  callbacks: null,
  disabled: false,
  shortcuts: false,
  summernote: null,
  btnSize: 'btn-xs',
  dialogsFade: true,
  placeholder: null,
  dialogsInBody: false,
  disableDragAndDrop: false,

  summernoteOptions() {
    let buttons = {};
    let _buttons = this.get('buttons') || [];
    let callbacks = this.get('callbacks') || {};
    let toolbar = this.get('toolbar') || defaultToolbar;
    callbacks.onChange = this.get('onContentChange') || ((content) => this.set('content', content));

    let properties = this.getProperties([
      'height', 'focus', 'lang', 'airMode', 'shortcuts', 'placeholder',
      'dialogsInBody', 'dialogsFade', 'disableDragAndDrop'
    ]);

    _buttons.forEach((item, i) => {
      buttons[`myButton${i}`] = item;
      toolbar.push([`myButton${i}`, [`myButton${i}`]]);
    });

    return Object.assign(properties, { callbacks, toolbar, buttons });
  },

  setupSummernote() {
    let summernote = this.get('summernote');
    let parent = summernote.parent();

    parent.find('.note-editable').attr('contenteditable', !this.get('disabled'));
    parent.find('.btn').addClass(this.get('btnSize'));

    let content = this.get('content');
    summernote.summernote('code', content);

  },

  willDestroyElement() {
    let summernote = this.get('summernote');
    summernote.summernote('destroy');
  },

  didInsertElement() {
    let summernoteOptions = this.summernoteOptions();

    let summernote = this.$('.summernote').summernote(summernoteOptions);

    this.set('summernote', summernote);

    this.setupSummernote();
  },

  setHeight: observer('height', function() { // eslint-disable-line
    let parent = this.get('summernote').parent();
    parent.find('.note-editable').css('height', this.get('height'));
  }),

  setDisabled: observer('disabled', function() { // eslint-disable-line
    let parent = this.get('summernote').parent();
    parent.find('.note-editable').attr('contenteditable', !this.get('disabled'));
  })
});
