import React from 'react';

export default ({
                  name = 'card',
                  style = {},
                  fill = '#000',
                  width = '100%',
                  className = '',
                  height = '100%',
                  viewBox = '0 0 32 32',
                }) =>
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
       width={width} height={height} viewBox={viewBox}
       preserveAspectRatio="xMidYMid meet" className={className}>
    <metadata>
      Created by potrace 1.15, written by Peter Selinger 2001-2017
    </metadata>
    <g transform="translate(0.000000,88.000000) scale(0.100000,-0.100000)"
       fill="#000000" stroke="none">
      <path d="M270 852 c-28 -14 -51 -45 -122 -167 -48 -82 -100 -172 -114 -200
l-26 -50 110 -190 c77 -134 119 -197 142 -212 l33 -23 3382 0 3382 0 33 22
c23 16 65 79 142 213 l110 190 -26 50 c-14 28 -66 118 -114 200 -71 122 -94
153 -122 167 -33 17 -217 18 -3405 18 -3188 0 -3372 -1 -3405 -18z"/>
    </g>
  </svg>;
