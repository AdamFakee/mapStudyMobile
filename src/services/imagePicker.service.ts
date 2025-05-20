import { Platform } from 'react-native';
import {Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary, OptionsCommon} from 'react-native-image-picker';

export default class ImagePickerService {
    private static commonOpts: OptionsCommon = {
        mediaType: 'photo',
        quality: 0.7,
    }

    private static cameraOpts: CameraOptions = {
        cameraType: 'front',
        saveToPhotos: true,
        ...this.commonOpts
    };

    private static libaryOpts: ImageLibraryOptions = {
        selectionLimit: 1,
        ...this.commonOpts,
    };

    static async pickImgFromCamera(): Promise<Asset | undefined> {
        try {
            const result = await launchCamera(this.cameraOpts);

            if(result.didCancel || result.errorCode) {
                console.log('camera cancel::::', result)
                return undefined;
            }

            console.log('camera:::', result.assets)
            return result.assets?.[0];
        } catch (error) {
            console.log('camera:::', error);
            return undefined;
        }
    }

    static async pickFromLibrary(): Promise<Asset | undefined> {
        try {
            const result = await launchImageLibrary(this.libaryOpts);

            if (result.didCancel || result.errorCode) {
                console.log('Library cancel:', result.errorMessage);
                return undefined;
            }

            return result.assets?.[0];
        } catch (error) {
            console.error('Library error:', error);
            return undefined;
        }
    }

    static convertImageByFormData(data: Asset | undefined, fieldName: string) {
        const formData = new FormData();

        if(!data || !data.uri) {
            console.log('wrong data img:::', data);
            return;
        }
        formData.append(fieldName, {
            name: data.fileName,
            type: data.type,
            uri: Platform.OS === 'ios' ? data.uri.replace('file://', '') : data.uri,
        });

        console.log(formData)
        return formData;
    }
}