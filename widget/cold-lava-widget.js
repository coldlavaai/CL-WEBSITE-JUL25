/**
 * Cold Lava AI Custom Widget
 * Version: 1.0.0
 * Created for: Cold Lava AI
 *
 * This widget provides a glassmorphism-styled floating button
 * that opens a modal with contact options.
 *
 * Usage:
 * 1. Include cold-lava-widget.css in your <head>
 * 2. Add the widget HTML before </body>
 * 3. Include this script before </body>
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    function initWidget() {
        const widgetBtn = document.getElementById('coldLavaWidgetBtn');
        const widgetModal = document.getElementById('coldLavaWidgetModal');
        const widgetClose = document.getElementById('coldLavaWidgetClose');

        if (!widgetBtn || !widgetModal || !widgetClose) {
            console.error('Cold Lava Widget: Required elements not found');
            return;
        }

        // Toggle widget modal
        widgetBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            widgetModal.classList.toggle('active');

            // Track widget open event (if analytics available)
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', 'WidgetOpened');
            }
        });

        // Close widget modal
        widgetClose.addEventListener('click', function(e) {
            e.stopPropagation();
            widgetModal.classList.remove('active');
        });

        // Close modal when clicking outside
        document.addEventListener('click', function(e) {
            if (!widgetBtn.contains(e.target) && !widgetModal.contains(e.target)) {
                widgetModal.classList.remove('active');
            }
        });

        // Prevent modal close when clicking inside
        widgetModal.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && widgetModal.classList.contains('active')) {
                widgetModal.classList.remove('active');
            }
        });

        // Track widget option clicks
        const widgetOptions = document.querySelectorAll('.widget-option');
        widgetOptions.forEach(function(option, index) {
            option.addEventListener('click', function() {
                if (typeof fbq !== 'undefined') {
                    const actionType = ['Call', 'BookCall', 'Email'][index] || 'WidgetAction';
                    fbq('trackCustom', 'WidgetAction_' + actionType);
                }
            });
        });

        console.log('Cold Lava Widget initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
