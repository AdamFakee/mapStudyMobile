import notifee, { EventType, Notification } from '@notifee/react-native';
import { Alert, PermissionsAndroid } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { NOTIFICATION_MESSAGE_TYPE } from '../constants/notification';
import { rootNavigationRef } from '../navigationScreen';


class NotificationService {

    static async initialize() {
        // Kiểm tra và yêu cầu quyền
        await this.requestPermission();
        console.log(await messaging().getToken())
        // foreground
        messaging().onMessage(async (remoteMessage) => {
            console.log('foregaround:::::::::', remoteMessage)
            await this.receivedMessage(remoteMessage);
        });

        // app đang chạy background => ấn vào thông báo 
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log('onNotification::::', remoteMessage)
            this.navigateToScreen(remoteMessage.notification)
            // await this.receivedMessage(remoteMessage);
        });

        // app đang đóng => mở từ thông báo
        const initialNotification = await messaging().getInitialNotification();
        if (initialNotification) {
            console.log('initialNotification:::::', initialNotification)
            this.navigateToScreen(initialNotification);
        }

        // background
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('background:::::', remoteMessage)
            await this.receivedMessage(remoteMessage);
        });

        // handle event
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            const { notification } = detail;

            if(!notification) return;
            // Xử lý các loại sự kiện
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', notification);
                break;
                case EventType.PRESS:
                    const { data } = notification;
                    console.log(data)
                    if(!data) return;
                    this.navigateToScreen(data);
                break;
                case EventType.ACTION_PRESS:
                    console.log('User pressed an action', notification);
                break;
            }
        });

    }
    private static async checkPermission() {
        return await PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS');
    }
    private static async requestPermission() {
        const granted = await this.checkPermission();
        if(granted === false) {
            await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS');
        }
        return;
    }

    private static async displayNotification(notification: FirebaseMessagingTypes.Notification) {
        const granted = await this.checkPermission();
        if(granted === false) {
            return Alert.alert('khoong co quyen');
        }


        const {title, body} = notification;

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        return await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId,
                // pressAction is needed if you want the notification to open the app when pressed
            },
        });
    }

    private static async receivedMessage(message: FirebaseMessagingTypes.RemoteMessage) {
        const notification = message.notification;
        if(!notification) return;
        return this.displayNotification(notification);
    }

    private static navigateToScreen(notification: Notification) {
        const { data: {messageType, chapterId, courseId, chapterTitle }} = notification;
        if(messageType === NOTIFICATION_MESSAGE_TYPE.LESSON_UPDATE) {
            console.log('navigation')
            if(rootNavigationRef.isReady()) console.log('ok')
            rootNavigationRef.navigate('courseTab', {
                screen: 'Chapter',
                params: { chapterId, chapterTitle, courseId },
            });
        }
    }
}

export default NotificationService;