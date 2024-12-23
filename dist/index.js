'use client';
import { __rest, __assign, __awaiter, __generator, __spreadArray } from 'tslib';
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { DataTable as DataTable$1 } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useTranslations } from 'next-intl';
import { confirmDialog } from 'primereact/confirmdialog';
import { Skeleton } from 'primereact/skeleton';
import { Password } from 'primereact/password';
import { Editor } from 'primereact/editor';
import { Calendar } from 'primereact/calendar';
import { DateTime } from 'luxon';
import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';
import RandExp from 'randexp';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';

function LinkButton(_a) {
    var faIcon = _a.faIcon, route = _a.route, rest = __rest(_a, ["faIcon", "route"]);
    var router = useRouter();
    var buttonProps = {};
    if (faIcon != undefined) {
        buttonProps.icon = React.createElement(FontAwesomeIcon, { icon: faIcon });
    }
    return React.createElement(Button, __assign({}, buttonProps, { onClick: function () { return router.push(route); } }, rest));
}

var DefaultNotificationContext = createContext(null);
function createUseNotificationHook(context) {
    if (context === void 0) { context = DefaultNotificationContext; }
    return function () {
        return useContext(context);
    };
}
var NotificationContext = DefaultNotificationContext;
//
var useNotification = createUseNotificationHook();

function Notification(_a) {
    var children = _a.children;
    var toast = useRef(null);
    var _b = useState(null), val = _b[0], setVal = _b[1];
    useEffect(function () {
        if (toast.current != null)
            setVal(toast.current);
    }, [toast]);
    return React.createElement(React.Fragment, null,
        React.createElement(Toast, { ref: toast }),
        React.createElement(NotificationContext.Provider, { value: val }, children));
}

function buildIconsFromIconSet(iconSet) {
    return {
        faArrowLeft: iconSet.faArrowLeft,
        faEye: iconSet.faEye,
        faSearch: iconSet.faSearch,
        faTrash: iconSet.faTrash,
        faXmark: iconSet.faXmark,
        faRotateRight: iconSet.faRotateRight,
    };
}

var DefaultConfigurationContext = createContext(null);
function createUseConfigurationHook(context) {
    if (context === void 0) { context = DefaultConfigurationContext; }
    return function () {
        return useContext(context);
    };
}
var ConfigurationContext = DefaultConfigurationContext;
//
var useConfiguration = createUseConfigurationHook();

function ConfigurationProvider(_a) {
    var children = _a.children, configuration = _a.configuration;
    return React.createElement(React.Fragment, null,
        React.createElement(ConfigurationContext.Provider, { value: configuration }, children));
}

function DataTable(props) {
    var _this = this;
    var configuration = useConfiguration();
    var t = useTranslations();
    var _a = props.queryAll(), data = _a.data, isLoading = _a.isLoading, isFetching = _a.isFetching, refetchList = _a.refetch;
    var deleteItemApi = props.deleteItem()[0];
    var _b = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }), filters = _b[0], setFilters = _b[1];
    var _c = useState(''), globalFilterValue = _c[0], setGlobalFilterValue = _c[1];
    var router = useRouter();
    var toast = useNotification();
    var initFilters = function () {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilterValue('');
    };
    var clearFilter = function () {
        initFilters();
    };
    var onGlobalFilterChange = function (newVal) {
        var _filters = __assign({}, filters);
        // @ts-ignore
        _filters['global'].value = newVal;
        setFilters(_filters);
        setGlobalFilterValue(newVal);
    };
    var renderHeader = function () {
        return (React.createElement("div", { className: 'filterRow' },
            React.createElement(IconField, { iconPosition: "left" },
                React.createElement(InputIcon, null,
                    React.createElement(FontAwesomeIcon, { icon: configuration.iconSet.faSearch, height: "1em", width: "1em" })),
                React.createElement(InputText, { value: globalFilterValue, onChange: function (e) { return onGlobalFilterChange(e.target.value); }, placeholder: t(configuration.translations.search), "data-test": 'txt-list-search' })),
            React.createElement(Button, { severity: "secondary", icon: React.createElement(FontAwesomeIcon, { icon: configuration.iconSet.faXmark }), onClick: function () { return clearFilter(); }, "data-test": 'btn-list-search-clear', tooltip: t(configuration.translations.search_reset), tooltipOptions: { position: "bottom" } })));
    };
    var deleteItem = function (rowData) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deleteItemApi(rowData.id)];
                case 1:
                    res = _a.sent();
                    if (res.error != null) {
                        toast.show({ severity: 'error', summary: t(props.deleteErrorTranslationKey, rowData) });
                    }
                    else {
                        toast.show({ severity: 'success', summary: t(props.deleteSuccessTranslationKey, res.data) });
                    }
                    refetchList();
                    return [2 /*return*/];
            }
        });
    }); };
    var deleteItemPrompt = function (rowData) {
        confirmDialog({
            message: React.createElement("span", { dangerouslySetInnerHTML: {
                    __html: t.markup(props.deletePromptTranslationKey, __assign(__assign({}, rowData), { b: function (chunks) { return "<b>".concat(chunks, "</b>"); } }))
                } }),
            header: React.createElement(React.Fragment, null,
                React.createElement(FontAwesomeIcon, { icon: configuration.iconSet.faTrash }),
                " ",
                t('general.delete_question')),
            defaultFocus: "reject",
            accept: function () {
                deleteItem(rowData);
            },
            acceptLabel: t(configuration.translations.delete),
            rejectLabel: t(configuration.translations.abort),
            acceptClassName: "p-button-danger"
        });
    };
    var openItem = function (rowData) {
        router.push(typeof props.openItemRoute === 'function' ? props.openItemRoute(rowData) : props.openItemRoute);
    };
    var actionBodyTemplate = function (rowData) {
        var isViewable = props.isViewable != undefined ? props.isViewable(rowData) : true;
        var isDeletable = props.isDeletable != undefined ? props.isDeletable(rowData) : true;
        return (React.createElement(React.Fragment, null,
            isViewable ?
                React.createElement(Button, { icon: React.createElement(FontAwesomeIcon, { icon: configuration.iconSet.faEye }), severity: "info", onClick: function () { return openItem(rowData); }, "data-test": "btn-view-".concat(rowData.id), tooltip: t(configuration.translations.edit), tooltipOptions: { position: "bottom" } }) : null,
            isDeletable ? React.createElement(Button, { icon: React.createElement(FontAwesomeIcon, { icon: configuration.iconSet.faTrash }), severity: "danger", onClick: function () { return deleteItemPrompt(rowData); }, "data-test": "btn-delete-".concat(rowData.id), tooltip: t(configuration.translations.delete), tooltipOptions: { position: "bottom" } }) : null));
    };
    return React.createElement(React.Fragment, null, isLoading || isFetching ? React.createElement("div", { className: 'pageLoading' },
        React.createElement(Skeleton, null)) :
        React.createElement(DataTable$1, { value: data, scrollable: true, paginator: true, rowsPerPageOptions: [10, 20, 50, 100], rows: 10, globalFilterFields: ['id', 'name'], filters: filters, onFilter: function (f) { return setFilters(f.filters); }, emptyMessage: t(props.emptyListTranslationKey), globalFilter: globalFilterValue, header: renderHeader(), "data-test": props.dataTest },
            React.createElement(Column, { field: "id", header: t(configuration.translations.id), style: { maxWidth: '10em' } }),
            props.columns.map(function (c) { return React.createElement(Column, { key: c.key, field: c.key, header: t(c.translationKey) }); }),
            React.createElement(Column, { body: actionBodyTemplate, exportable: false, className: 'actionColumn' })));
}

function CheckboxSelection(props) {
    var _a = useState(), opts = _a[0], setOpts = _a[1];
    if (typeof props.options === "function") {
        var _b = props.options(), data_1 = _b.data, isLoading_1 = _b.isLoading;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(function () {
            if (!isLoading_1 && data_1 != null)
                setOpts(data_1);
        }, [data_1, isLoading_1]);
    }
    else {
        setOpts(props.options);
    }
    function changeSelection(checked, option) {
        props.onChange(checked ? __spreadArray(__spreadArray([], props.value, true), [option.id], false) : props.value.filter(function (v) { return v !== option.id; }));
    }
    return React.createElement(React.Fragment, null, opts === null || opts === void 0 ? void 0 : opts.map(function (o) { return React.createElement("div", { className: 'checkbox', key: o.id },
        React.createElement(Checkbox, { checked: props.value.indexOf(o.id) > -1, value: o, id: "chk-".concat(o), onChange: function (e) { return changeSelection(e.target.checked, o); } }),
        React.createElement("label", { htmlFor: "chk-".concat(o.id) }, o.name)); }));
}

function renderInputText(id, value, onChange, readonly, keyFilter) {
    return React.createElement(InputText, { id: id, value: value, onChange: function (e) { return onChange(e.target.value); }, keyfilter: keyFilter, "data-test": "txt-".concat(id), disabled: readonly });
}
function renderTextField(field, obj, onChange) {
    var _a;
    return renderInputText(field.key, obj[field.key], function (val) {
        var _a;
        return onChange((_a = {}, _a[field.key] = val, _a));
    }, !((_a = field.editable) !== null && _a !== void 0 ? _a : true));
}
function renderEmailField(field, obj, onChange) {
    var _a;
    return renderInputText(field.key, obj[field.key], function (val) {
        var _a;
        return onChange((_a = {}, _a[field.key] = val, _a));
    }, !((_a = field.editable) !== null && _a !== void 0 ? _a : true), 'email');
}
function renderNumberField(field, obj, onChange) {
    var _a;
    return renderInputText(field.key, obj[field.key], function (val) {
        var _a;
        return onChange((_a = {}, _a[field.key] = val, _a));
    }, !((_a = field.editable) !== null && _a !== void 0 ? _a : true), 'int');
}
function renderPassword(field, obj, onChange) {
    var _a;
    return React.createElement(Password, { toggleMask: true, value: obj[field.key], onChange: function (e) {
            var _a;
            return onChange((_a = {}, _a[field.key] = e.target.value, _a));
        }, id: field.key, "data-test": "pwd-".concat(field.key), readOnly: !((_a = field.editable) !== null && _a !== void 0 ? _a : true) });
}
function renderEditor(field, obj, onChange) {
    var _a;
    return React.createElement(Editor, { value: obj[field.key], onTextChange: function (e) {
            var _a;
            return onChange((_a = {}, _a[field.key] = e.htmlValue, _a));
        }, readOnly: !((_a = field.editable) !== null && _a !== void 0 ? _a : true) });
}
function renderCalendar(id, value, onChange, showTime, readonly) {
    return React.createElement(Calendar, { selectionMode: 'single', value: value, onChange: function (e) { return onChange(e.value); }, showTime: showTime, showWeek: true, hourFormat: "24", dateFormat: "dd.mm.yy", "data-test": "dd-".concat(id), disabled: readonly });
}
function renderDateSelector(field, obj, onChange) {
    var _a;
    return renderCalendar(field.key, DateTime.fromISO(obj[field.key]).toJSDate(), function (e) {
        var _a;
        return onChange((_a = {}, _a[field.key] = DateTime.fromJSDate(e).toString(), _a));
    }, false, !((_a = field.editable) !== null && _a !== void 0 ? _a : true));
}
function renderDateTimeSelector(field, obj, onChange) {
    var _a;
    return renderCalendar(field.key, DateTime.fromISO(obj[field.key]).toJSDate(), function (e) {
        var _a;
        return onChange((_a = {}, _a[field.key] = DateTime.fromJSDate(e).toString(), _a));
    }, true, !((_a = field.editable) !== null && _a !== void 0 ? _a : true));
}
function renderCheckSelection(field, obj, onChange) {
    return React.createElement("div", { className: 'form-check-selection-row' },
        React.createElement(CheckboxSelection, { value: obj[field.key], onChange: function (e) {
                var _a;
                return onChange((_a = {}, _a[field.key] = e, _a));
            }, options: field.options }));
}
function renderGeneratedSecret(field, obj, onChange) {
    var _a;
    var configuration = useConfiguration();
    var t = useTranslations();
    function generateNewValue(e) {
        var _a;
        var _b;
        e.preventDefault();
        var r = new RandExp((_b = field.allowedCharacters) !== null && _b !== void 0 ? _b : "[a-zA-Z0-9!\:\-_\"\§\%\&\\\(\)\.\,]{32}");
        onChange((_a = {}, _a[field.key] = r.gen(), _a));
    }
    return React.createElement("div", { className: 'formRow' },
        React.createElement("div", { className: "p-inputgroup" },
            renderInputText(field.key, obj[field.key], function (val) {
                var _a;
                return onChange((_a = {}, _a[field.key] = val, _a));
            }, !((_a = field.editable) !== null && _a !== void 0 ? _a : true)),
            React.createElement(Button, { icon: React.createElement(FontAwesomeIcon, { icon: configuration.iconSet.faRotateRight }), onClick: function (e) { return generateNewValue(e); } }, t(configuration.translations.generate))));
}
function renderInputField(field, obj, onChange) {
    switch (field.type) {
        case 'text':
            return renderTextField(field, obj, onChange);
        case 'editor':
            return renderEditor(field, obj, onChange);
        case 'email':
            return renderEmailField(field, obj, onChange);
        case 'date':
            return renderDateSelector(field, obj, onChange);
        case 'datetime':
            return renderDateTimeSelector(field, obj, onChange);
        case 'number':
            return renderNumberField(field, obj, onChange);
        case 'password':
            return renderPassword(field, obj, onChange);
        case 'option':
            return null;
        case 'selection-check':
            return renderCheckSelection(field, obj, onChange);
        case 'generated-secret':
            return renderGeneratedSecret(field, obj, onChange);
    }
}
function Form(props) {
    var t = useTranslations();
    function renderField(field, obj, onChange) {
        var _a;
        return React.createElement("div", { className: classNames('formField', "size-".concat((_a = field.size) !== null && _a !== void 0 ? _a : 12)), key: field.key },
            React.createElement("label", { htmlFor: field.key }, t(field.labelTranslationKey)),
            renderInputField(field, obj, onChange));
    }
    function renderRow(row) {
        return React.createElement("div", { className: 'formRow', key: row.map(function (f) { return f.key; }).join(",") }, row.map(function (f) { return renderField(f, props.object, function (e) { return props.onChange(e); }); }));
    }
    function onSubmit(e) {
        e.preventDefault();
        props.onSave();
    }
    return React.createElement("form", { onSubmit: function (e) { return onSubmit(e); } },
        React.createElement("div", { className: 'formColumn' }, props.rows.map(function (r) { return renderRow(r); })));
}

function FormSkeleton(props) {
    function renderSkeletonField(field) {
        var _a;
        return React.createElement("div", { className: classNames('formField', "size-".concat((_a = field.size) !== null && _a !== void 0 ? _a : 12)), key: field.key },
            React.createElement(Skeleton, { width: "25%" }),
            React.createElement(Skeleton, { width: "100%" }));
    }
    function renderSkeletonRow(row) {
        return React.createElement("div", { className: 'formRow', key: row.map(function (m) { return m.key; }).join(",") }, row.map(function (r) { return renderSkeletonField(r); }));
    }
    function renderSkeleton(rows) {
        return React.createElement("div", { className: 'formColumn' }, rows.map(function (r) { return renderSkeletonRow(r); }));
    }
    return renderSkeleton(props.rows);
}

function FetchError(_a) {
    var error = _a.error;
    var t = useTranslations();
    // @ts-ignore
    var httpStatus = error.originalStatus;
    var errorCode = "general.errors.unknown";
    if (httpStatus == 404) {
        errorCode = "general.errors.not_found";
    }
    return React.createElement(React.Fragment, null,
        React.createElement("h1", null, t(errorCode)),
        React.createElement("span", null, t('general.errors.retry')));
}

function clusterFields(fields) {
    var _a;
    var rows = [];
    var currentRow = [];
    var currentSizes = 0;
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var size = (_a = field.size) !== null && _a !== void 0 ? _a : 12;
        if (currentSizes + size > 12) {
            rows.push(currentRow);
            currentRow = [];
            currentSizes = 0;
        }
        currentRow.push(field);
        currentSizes += size;
    }
    if (currentSizes > 0) {
        rows.push(currentRow);
    }
    return rows;
}
function generateDefaultValue(type) {
    switch (type) {
        case 'email':
        case 'password':
        case 'editor':
        case 'generated-secret':
        case 'text':
            return "";
        case 'number':
            return 0;
        case 'date':
        case 'datetime':
            return new Date();
        case 'selection-check':
            return [];
    }
}
function ObjectEditor(props) {
    var _a = props.useLazyGetObject(), getObjectQuery = _a[0], _b = _a[1], apiObject = _b.data, isLoading = _b.isLoading, isError = _b.isError, error = _b.error;
    var updateObjectQuery = props.useUpdateObject()[0];
    var createObjectQuery = props.useCreateObject()[0];
    var _c = useState(null), object = _c[0], setObject = _c[1];
    var t = useTranslations();
    var toast = useNotification();
    var rows = clusterFields(props.fields);
    useEffect(function () {
        if (apiObject != null) {
            setObject(apiObject);
        }
    }, [isLoading, apiObject]);
    useEffect(function () {
        if (props.id != null && props.id != "null") {
            getObjectQuery(props.id);
        }
        else {
            var newObject = createNewObject();
            setObject(newObject);
        }
    }, [props.id, getObjectQuery]);
    useEffect(function () {
        if (props.objectEditorRef != null)
            props.objectEditorRef.current = { save: save };
    });
    function handleUpdateResponse(result) {
        return __awaiter(this, void 0, void 0, function () {
            var id, reload;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (result.error != null) {
                            toast.show({ severity: 'error', summary: t(props.saveErrorTranslationKey, object) });
                        }
                        else {
                            toast.show({ severity: 'success', summary: t(props.saveSuccessTranslationKey, object) });
                        }
                        id = ((_a = result.data) === null || _a === void 0 ? void 0 : _a.id) || props.id;
                        if (!(id != null && id != "null")) return [3 /*break*/, 2];
                        return [4 /*yield*/, getObjectQuery(id)];
                    case 1:
                        reload = _b.sent();
                        setObject(reload.data);
                        props.onSaved(reload.data);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function createNewObject() {
        var result = {};
        for (var _i = 0, _a = props.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            result[field.key] = generateDefaultValue(field.type);
        }
        return result;
    }
    function asyncUpdateObject() {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, updateObjectQuery(object)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, handleUpdateResponse(result)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function asyncCreateObject() {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createObjectQuery(object)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, handleUpdateResponse(result)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function save() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(props.id != null && props.id != "null")) return [3 /*break*/, 2];
                        return [4 /*yield*/, asyncUpdateObject()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, asyncCreateObject()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function onFormChanged(changed) {
        setObject(__assign(__assign({}, object), changed));
    }
    function renderForm() {
        return React.createElement(Form, { object: object, rows: rows, onChange: function (changed) { return onFormChanged(changed); }, onSave: function () { return save(); } });
    }
    return React.createElement(React.Fragment, null,
        React.createElement(Card, { className: 'pageWrapper' }, isLoading || object == null && !isError ? React.createElement(FormSkeleton, { rows: rows }) : isError ?
            React.createElement(FetchError, { error: error }) : renderForm()),
        props.additionalContent != null && !isLoading && object != null ? props.additionalContent(object, onFormChanged) : null);
}

function ApplicationToolbar(_a) {
    var title = _a.title, children = _a.children, backRoute = _a.backRoute, rest = __rest(_a, ["title", "children", "backRoute"]);
    var router = useRouter();
    var configuration = useConfiguration();
    var centerContent = function () { return React.createElement(React.Fragment, null, title); };
    var startContent = function () { return React.createElement(React.Fragment, null,
        React.createElement(Button, { icon: React.createElement(FontAwesomeIcon, { icon: configuration.iconSet.faArrowLeft }), onClick: function () { return !backRoute ? router.back() : router.replace(backRoute); } })); };
    return React.createElement(React.Fragment, null,
        React.createElement(Toolbar, __assign({ className: 'applicationToolbar', center: centerContent, end: React.createElement("span", { className: 'application-toolbar-end' }, children), start: startContent }, rest)));
}

function FlexClear() {
    return React.createElement("span", { className: 'flexClear' });
}

export { ApplicationToolbar, CheckboxSelection, ConfigurationContext, ConfigurationProvider, DataTable, FetchError, FlexClear, Form, FormSkeleton, LinkButton, Notification, NotificationContext, ObjectEditor, buildIconsFromIconSet, useConfiguration, useNotification };
//# sourceMappingURL=index.js.map
