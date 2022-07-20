import React from 'react';


// ----------------------------------------------------------------------
export default function Loading({ loading }) {
    return(<>
        {
            loading === true &&
            <div id="overlay">
                <div className="shapeshifter play" style={ { backgroundImage: `url(${'/image/sprite_60fps.svg'})` } } ></div>
            </div>
        }
    </>)
}
