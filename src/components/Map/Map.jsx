import React, { useEffect, useRef, useState } from 'react';
import mymap from './coords.json'
import worldmap from './world-map.png'

export default function Map({handleSelected}) {
    const image = useRef();
    const mapbox = useRef();
    const imageContainer = useRef();
    const [country, setCountry] = useState('WORLD MAP');
    const [dimensions, setDimensions] = React.useState({
        height: 0,
        width: 0
    })

    const Data = mymap.map(({ name, shape, coords }) => {
        return (<area alt={name} title={name} shape={shape} coords={coords} onClick={(e)=>{handleSelected(name)}} onMouseOver={(e) => { setCountry(name) }} />)
    })

    useEffect(() => {

        const defaultsize = image.current.naturalWidth;
        const clientsize = image.current.clientWidth;

        function updateSize() {
            mapbox.current.style.height = image.current.clientHeight+'px';
            image.current.style.width = defaultsize + 'px';
            imageContainer.current.style.transform = `scale(${clientsize / defaultsize})`;
        }

        function resize(){
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

            image.current.style.width = '100%';
            clientsize = image.current.clientWidth;

            updateSize();
        }

        if (clientsize !== defaultsize) {
            updateSize();
        }

        window.addEventListener('resize', resize);

        return _ => {
            window.removeEventListener('resize', resize)
        }

    }, [dimensions])

    return (
        <div ref={mapbox} className='map'>
            <div ref={imageContainer}>
                <div className='map-header'>{country}</div>
                <img ref={image} src={worldmap} alt="worldMap" useMap="#world" onMouseOut={() => setCountry('WORLD MAP')} />
                <map name="world">
                    {Data}
                </map>
            </div>
        </div>
    )
}