# ember-cli-summernote-editor

[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-summernote-editor.svg)](http://emberobserver.com/addons/ember-cli-summernote-editor)
[![Build Status](https://travis-ci.org/devotox/ember-cli-summernote-editor.svg)](http://travis-ci.org/devotox/ember-cli-summernote-editor)
[![Coverage Status](https://coveralls.io/repos/github/devotox/mber-cli-summernote-editor/badge.svg)](https://coveralls.io/github/devotox/mber-cli-summernote-editor)
[![NPM Version](https://badge.fury.io/js/ember-cli-summernote-editor.svg)](http://badge.fury.io/js/ember-cli-summernote-editor)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-summernote-editor.svg)](https://www.npmjs.org/package/ember-cli-summernote-editor)
[![Greenkeeper badge](https://badges.greenkeeper.io/devotox/ember-cli-summernote-editor.svg)](https://greenkeeper.io/)


## Description
A wrapper around the [summernote](https://github.com/summernote/summernote) library for use in ember-cli projects

[DEMO](http://devotox.github.io/ember-cli-summernote-editor)

## Installation
* `ember install ember-cli-summernote-editor`

## Basic Usage

### Handlebar Template

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  height: 200,
  value: "Some intial contents go here. Lorem Ipsum is simply dummy text of the printing.",
  disabled: false,

  actions: {
    changeHeight(someObject) {
      let height = someObject.doSomeCalculationToGetHeight();
      set(this, 'height', height)
    }
  }
});
```

```handlebars

{{summernote-editor
  focus=false
  btnSize=bs-sm
  airMode=false
  height=height
  buttons=buttons
  toolbar=toolbar
  disabled=disabled
  callbacks=callbacks
  content=(readonly value)
  onContentChange=(action (mut value))
}}
```

### Custom buttons usage ###

In hbs file
```javascript
    {{summernote-editor content=article buttons=customButtons}}
```

In controller file
```javascript
    import Ember from 'ember';

    export default Ember.Controller.extend({
        article: 'some text',
        customButtons: [],

        init() {

            let _onNewBlock = this.get('onNewBlock').bind(this);

            let newBlockButton = function (context) {
                var ui = $.summernote.ui;

                var button = ui.button({
                    contents: '<i class="fa fa-file-text-o"/> New div',
                    tooltip: 'New div',
                    click: _onNewBlock
                });

                return button.render();
            }

            this.customButtons.push(newBlockButton);

        },

        onNewBlock() {
            let blocks = '<div class="header" id="headerBlock"></div>';
            this.set('article', article + blocks);
        }
    });
```

All callbacks except `onChange` are supported.

The `onChange` callback are used internally for the `onContentChange` action.

```javascript
    callbackOptions: {
      onInit: function() {
        console.log('Summernote is launched');
      },
      onEnter: function() {
        console.log('Enter/Return key pressed');
      },
      onPaste: function(e) {
        console.log('Called event paste');
      },
    },
```

## Available options
See original library [Summernote](https://github.com/summernote/summernote)

#### License
MIT license.
