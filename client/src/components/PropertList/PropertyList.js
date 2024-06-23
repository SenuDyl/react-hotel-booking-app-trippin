import React from 'react'
import './propertyList.css'
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=berlin,madrid,london,ManHatton")
    console.log("data", data)
    return (
        <div className="pDetails">
            {loading ? "Loading please wait" : <><div className="pHeader">
                <span className="pTitle">Top destinations</span>
            </div>
                <div className="pList">
                    <div className="pListItem">
                        <img src="https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=" alt="property" className="pListImg" />
                        <div className="pListTitles">
                            <h2>Berlin</h2>
                            <h3>{data[0]} properties</h3>
                        </div>
                    </div>
                    <div className="pListItem">
                        <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg" alt="property" className="pListImg" />
                        <div className="pListTitles">
                            <h2>Madrid</h2>
                            <h3>{data[1]} properties</h3>
                        </div>
                    </div>
                    <div className="pListItem">
                        <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg" alt="property" className="pListImg" />
                        <div className="pListTitles">
                            <h2>London</h2>
                            <h3>{data[2]} properties</h3>
                        </div>
                    </div>
                    <div className="pListItem">
                        <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg" alt="property" className="pListImg" />
                        <div className="pListTitles">
                            <h2>New York</h2>
                            <h3>{data[3]} properties</h3>
                        </div>
                    </div>

                </div></>}
        </div>
    )
}
export default PropertyList;