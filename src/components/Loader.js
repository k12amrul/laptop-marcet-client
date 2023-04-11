import React from 'react';

const Loader = () => {
    return (
        <div>
            <progress className="progress progress-primary w-56" value="0" max="100"></progress>
        </div>
    );
};

export default Loader;