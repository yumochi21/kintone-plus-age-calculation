jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';

  // プラグインIDを取得
  var KEY = PLUGIN_ID;

  // プラグインの設定を取得
  var CONF = kintone.plugin.app.getConfig(KEY);

  /**
   * HTMLで使用できない文字のエスケープ処理を行う
   * @param {string} htmlstr 文字列
   * @returns {string} エスケープ済み文字列
   */
  var escapeHtml = function(htmlstr) {
    return htmlstr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /**
   * ドロップダウンの設定を行う
   */
  var setDropdown = function() {

    KintoneConfigHelper.getFields(['NUMBER', 'DATE']).then(function (resp) {
      
      for (var i = 0; i < resp.length; i++) {
        var prop = resp[i];
        var $option = $('<option>');

        $option.attr('value', escapeHtml(prop.code));
        $option.text(escapeHtml(prop.label));
        $('#select_birthday_field').append($option.clone());
        $('#select_ageyear_field').append($option.clone());
        $('#select_agemonth_field').append($option.clone());
      }

      // 初期値を設定する
      $('#select_birthday_field').val(CONF.birthday);
      $('#select_ageyear_field').val(CONF.ageyear);
      $('#select_agemonth_field').val(CONF.agemonth);
    }).catch(function (err) {
      alert(err.message);
    });
  }

  /**
   * 画面読み込み後に実行する処理
   */
  $(document).ready(function () {

    if (CONF) {
      setDropdown();
    }

    $('#plugin-submit').click(function () {
      
      var config = [];

      var birthday = $('#select_birthday_field').val();
      var ageyear = $('#select_ageyear_field').val();
      var agemonth = $('#select_agemonth_field').val();

      if (birthday === '' || ageyear === '') {
        alert('必須項目が入力されていません');
        return;
      }

      config.birthday = birthday;
      config.ageyear = ageyear;
      config.agemonth = agemonth;

      var uniqueConfig = [birthday, ageyear, agemonth];
      var uniqueConfig2 = uniqueConfig.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      
      if (Object.keys(config).length !== uniqueConfig2.length) {
        alert('選択肢が重複しています');
        return;
      }

      kintone.plugin.app.setConfig(config);
    });

    $('#plugin-cancel').click(function () {
      history.back();
    });
  });

})(jQuery, kintone.$PLUGIN_ID);
