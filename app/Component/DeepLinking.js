import NavigationService from '@Service/Navigation';

const PROTOCOL = 'myikyoku://';

class DeepLinking {
    open = (link) => {
        const query = link.substr(PROTOCOL.length);

        let action = query;
        let url = null;

        const pos = query.indexOf('?url=');
        if (pos > -1) {
            action = query.substr(0, pos);
            url = query.substr(pos + '?url='.length);
        }

        const state = (new Date()).getTime();

        action = action.substr('app/'.length);
        switch (action) {
            case 'web':
                NavigationService.navigate('PublicViewer', { url });
                return true;
            case 'news':
                NavigationService.navigate('PublicMain', { index: 0, pushUrl: url, pushState: state });
                return true;
            case 'rss':
                NavigationService.navigate('PublicMain', { index: 1, pushUrl: url, pushState: state });
                return true;
            case 'magazine':
                NavigationService.navigate('PublicMain', { index: 2, pushUrl: url, pushState: state });
                return true;
            case 'doctor-agent':
                NavigationService.navigate('PublicMain', { index: 3, pushUrl: url, pushState: state });
                return true;
            case 'resinavi':
                NavigationService.navigate('PublicMain', { index: 4, pushUrl: url, pushState: state });
                return true;
            case 'myclip':
                NavigationService.navigate('PublicClip');
                return true;
            case 'notifications':
                NavigationService.navigate('PublicNotifications');
                return true;
        }

        return false;
    }
}

module.exports = new DeepLinking();
