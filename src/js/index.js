jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';

  var CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);

  if (!CONFIG) {
    return false;
  }

  var CONFIG_BIRTHDAY = CONFIG.birthday;
  var CONFIG_AGEYEAR = CONFIG.ageyear;
  var CONFIG_AGEMONTH = CONFIG.agemonth;

  var calcYear = function(brithday) {
    var now = moment();
    var birthdayMoment = moment(brithday);

    var ageyear = now.diff(birthdayMoment, 'years');

    return ageyear;
  };

  var calcMonth = function(brithday) {
    var now = moment();
    var birthdayMoment = moment(brithday);

    var agemonth = now.diff(birthdayMoment, 'months');

    return agemonth % 12;
  };

  kintone.events.on([
    'app.record.create.change.' + CONFIG_BIRTHDAY,
    'app.record.edit.change.' + CONFIG_BIRTHDAY,
    'app.record.index.edit.change.' + CONFIG_BIRTHDAY
  ], function (event) {
    var ageyear = calcYear(event.changes.field.value);
    event.record[CONFIG_AGEYEAR].value = ageyear;

    if (CONFIG_AGEMONTH) {
      var agemonth = calcMonth(event.changes.field.value);
      event.record[CONFIG_AGEMONTH].value = agemonth;
    }

    return event;
  });

})(jQuery, kintone.$PLUGIN_ID);
