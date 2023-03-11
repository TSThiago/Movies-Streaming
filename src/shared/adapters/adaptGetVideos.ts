import { IVideoList, Videos } from "../../types/dataListFilms.interface"

const adaptGetVideos = (video: Videos): IVideoList[] => {
    const adaptedVideo: IVideoList[] = video.results.map(item => {
        return {
            key: item.key,
            type: item.type,
            site: item.site
        }
    })

    return adaptedVideo
}

export default adaptGetVideos