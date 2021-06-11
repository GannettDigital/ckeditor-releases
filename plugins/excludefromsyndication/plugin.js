(function () {
    const getParent = function(editor) {
        const parents = editor.elementPath().elements;
        for (i = 0; i < parents.length; i++) {
            const parentName = parents[i].getName().toLowerCase();
            if (parentName === 'p' || parentName === 'ol' || parentName === 'ul') {
                return parents[i];
            }
        }
        return false;
    }

    CKEDITOR.plugins.add('ExcludeFromSyndication', {
        icons: 'ExcludeFromSyndication',
        init: function(editor) {

            editor.on('selectionChange', function (event) {
                const parent = getParent(event.editor);
                if (parent && parent.hasClass('exclude-from-syndication')) {
                    !editor.readOnly && editor.getCommand('ExcludeFromSyndication').setState(CKEDITOR.TRISTATE_ON);
                } else {
                    !editor.readOnly && editor.getCommand('ExcludeFromSyndication').setState(CKEDITOR.TRISTATE_OFF);
                }
            })

            editor.addCommand('ExcludeFromSyndication', {
                exec: function (editor) {
                    const parent = getParent(editor);
                    if (parent) {
                        if (parent.hasClass('exclude-from-syndication')) {
                            parent.removeClass('exclude-from-syndication');
                            !editor.readOnly && editor.getCommand('ExcludeFromSyndication').setState(CKEDITOR.TRISTATE_OFF);
                        } else {
                            parent.addClass('exclude-from-syndication');
                            !editor.readOnly && editor.getCommand('ExcludeFromSyndication').setState(CKEDITOR.TRISTATE_ON);
                        }
                    }
                }
            });

            editor.ui.addButton('ExcludeFromSyndication', {
                label: 'Exclude From Syndication (SHIFT+ALT+X)',
                command: 'ExcludeFromSyndication',
                toolbar: 'ExcludeFromSyndication'
            });

            editor.setKeystroke(CKEDITOR.SHIFT + CKEDITOR.ALT + 88, 'ExcludeFromSyndication'); // SHIFT+ALT+X
        }
    });
})();
