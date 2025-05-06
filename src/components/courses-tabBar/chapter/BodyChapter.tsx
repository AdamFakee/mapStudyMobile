import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { domain } from '../../../constants/domain';
import { ChapterDetail } from '../../../types/definition';
import { useRoute } from '@react-navigation/native';
import { CourseTabBarProps } from '../../../navigationScreen/(tabBar)/Courses';
import { asyncStorageService } from '../../../services/asyncStorage.service';
import { keyStore } from '../../../constants/storeData';
import { RawAxiosRequestHeaders } from 'axios';
import { ApiResponse, callApi } from '../../../customs/axiosLib';
import VideoPlay from '../../VideoPlay';
import { getWidth } from '../../../utils/demensionUtils';
import DetailTab from './DetailTab';
import Loading from '../../Loading';
import RequireActiveCourse from '../../require/RequireActiveCourse';
import { gap } from '../../../constants/style';
import { useAppSelectorGlobal } from '../../../redux/store/globalStore';


const widthScreen = getWidth('screen');

interface resultFetch extends ApiResponse {
    metadata: {
        chapter: ChapterDetail;
    };
}

const BodyChapter = () => {
    const [chapter, setChapter] = useState<ChapterDetail>();
    const globalState = useAppSelectorGlobal(state => state.globalReducer);
    const [err, setErr] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { courseId } = useRoute<CourseTabBarProps<'Chapter'>['route']>().params;
    useEffect(() => {
        const url = `${domain}/lesson/${courseId}`;
        const fetchChapter = async () => {
            const headers: RawAxiosRequestHeaders = {
                'x-course-id': courseId.toString(),
                'x-client-email': globalState.dataUser.email || null,
                'authorization': await asyncStorageService.getData({key: keyStore.accessToken}),
            };
            try {
                const res: resultFetch = await callApi<resultFetch>({ url, headers });
                if(res.status === 200) {
                    setChapter(res.metadata.chapter);
                }
            } catch (error) {
                console.log(error)
                setErr(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchChapter();
    }, [courseId, globalState.dataUser.email])
    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <Loading />
                ) :
                    (
                        <>
                            {
                                err === true ?
                                (
                                    <RequireActiveCourse/>
                                ) : (
                                    <View style={styles.videoPlayContainer}>
                                        <VideoPlay link={chapter?.video_link}/>
                                    </View>
                                )
                            }
                            <View style={styles.detailTabContainer}>
                                <DetailTab />
                            </View>
                        </>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: gap.sm * 1.5
    },
    videoPlayContainer: {
        width: '100%',
        height: widthScreen * 3 / 5,
    },
    detailTabContainer: {
        flex: 1,
    }
})

export default BodyChapter