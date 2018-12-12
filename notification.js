(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['angular'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('angular'));
    } else {
        // Browser globals
        factory(angular);
    }
}(function (angular) {

    var module = angular.module('notifications', []);

    module.provider('$notification', function () {
        var settings = {
            info: {
                duration: 5000,
                enabled: true,
                class: 'info'
            },
            warning: {
                duration: 5000,
                enabled: true,
                class: 'warning'
            },
            error: {
                duration: 5000,
                enabled: true,
                class: 'danger'
            },
            success: {
                duration: 5000,
                enabled: true,
                class: 'success'
            },
            progress: {
                duration: 0,
                enabled: true,
                class: ''
            },
            custom: {
                duration: 35000,
                enabled: true,
                class: ''
            },
            details: true,
            localStorage: false,
            html5Mode: false,
            templateName: 'ng-notification-template'
        };
        this.setSettings = function (s) {
            angular.extend(settings, s);
        };

        function Notification($timeout, s) {
            var settings = s;
            var notifications = JSON.parse(localStorage.getItem('$notifications')) || [],
                queue = [];

            function html5Notify(icon, title, content, ondisplay, onclose) {
              if (settings.html5Mode == 'webkit') {
                if (window.webkitNotifications.checkPermission() === 0) {
                  if (!icon) {
                    icon = 'favicon.ico';
                  }
                  var noti = window.webkitNotifications.createNotification(icon, title, content);
                  if (typeof ondisplay === 'function') {
                    noti.ondisplay = ondisplay;
                  }
                  if (typeof onclose === 'function') {
                    noti.onclose = onclose;
                  }
                  noti.show();
                }
                else {