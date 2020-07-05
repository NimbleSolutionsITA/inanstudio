import _ from 'lodash';

export const formatPrice = (price) =>  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price)

export const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const templateSettings = {
    escape: /\{\{(.+?)\}\}/g,
};

const safeTemplateData = (templateString, data) =>
    templateString
        .split(templateSettings.escape)
        .reduce(
            (acc, key) => _.merge(acc, _.set({}, key, _.get(data || {}, key, ''))),
            {},
        );

export const template = (templateString, data) =>
    _.template(templateString, templateSettings)(
        safeTemplateData(templateString, data),
    );

/* Usage
 * import template from 'utils/template';
 *
 * const templateString = 'Ciao {{nome}} {{cognome}}';
 * const data = { nome: 'Mario', cognome: 'Rossi'};
 *
 * const result = template(templateString, data); // Ciao Mario Rossi
 */
