"""
Plugin definition for the dashboard OPAL plugin
"""
from opal.core import plugins

from dashboard.urls import urlpatterns


class DashboardPlugin(plugins.OpalPlugin):
    """
    Main entrypoint to expose this plugin to our OPAL application.
    """
    urls = urlpatterns
    javascripts = {
        # Add your javascripts here!
        'opal.dashboard': [
            'js/dashboard/app.js',
            # 'js/dashboard/controllers/larry.js',
            # 'js/dashboard/services/larry.js',
        ]
    }
    menuitems = [
        dict(
            href='/dashboards/', display="Dashboards", icon="fa fa-dashboard",
            activepattern='/dashboards', index=3
        )
    ]

plugins.register(DashboardPlugin)
