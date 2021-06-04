(function () {
    // Custom style.
    var excludeFromSyndication = new CKEDITOR.style({
        element: 'p',
        attributes: {
            'class': 'exclude-from-syndication'
        }
    });

    CKEDITOR.plugins.add('ExcludeFromSyndication', {
        icons: 'ExcludeFromSyndication',
        init: function(editor) {
            editor.attachStyleStateChange(excludeFromSyndication, function(state) {
                !editor.readOnly && editor.getCommand('ExcludeFromSyndication').setState(state);
            });

            editor.addCommand('ExcludeFromSyndication', {
                exec: function (editor) {
                    const parents = editor.elementPath().elements;
                    for(i = 0; i < parents.length; i++) {
                        if (parents[i].getName().toLowerCase() === 'p') {
                            if (parents[i].hasClass('exclude-from-syndication')) {
                                parents[i].removeClass('exclude-from-syndication');
                                editor.getCommand('ExcludeFromSyndication').setState(CKEDITOR.TRISTATE_OFF);
                            } else {
                                parents[i].addClass('exclude-from-syndication');
                                editor.getCommand('ExcludeFromSyndication').setState(CKEDITOR.TRISTATE_ON);
                            }
                            break;
                        }
                    }
                }
            });

            editor.ui.addButton('ExcludeFromSyndication', {
                label: 'Exclude From Syndication (SHIFT+ALT+S)',
                command: 'ExcludeFromSyndication',
                toolbar: 'ExcludeFromSyndication'
            });

            editor.setKeystroke(CKEDITOR.SHIFT + CKEDITOR.ALT + 53, 'ExcludeFromSyndication'); // SHIFT+ALT+S
        }
    });
})();
