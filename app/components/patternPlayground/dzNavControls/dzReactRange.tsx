import * as React from 'react';
import { Range, getTrackBackground } from "react-range";
import { convertToPercentage } from '../dzPatternHelpers';
import usePatternPlayground from '../usePatternProvider';

const STEP = 1;
const MIN = 200;
const MAX = 1000;

const DzReactRange: React.FC<{ rtl: boolean }> = ({ rtl }) => {

  const { state: { patternRange }, changeRangeSize } = usePatternPlayground()

  return (
    <div
      className='flex flex-row w-full bg-[#F0EEED] rounded-lg flex-1 py-3 px-3 items-center'
    >
      <div className='text-sm font-semibold'>Size</div>
      <div className='flex-1 w-full ml-4 mr-2'>
        <Range
          values={patternRange}
          step={STEP}
          min={MIN}
          max={MAX}
          rtl={rtl}
          onChange={(values: any) => changeRangeSize(values)}
          renderTrack={({ props, children }: any) => {
            return (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '26px',
                  display: 'flex',
                  width: '100%'
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '5px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values: patternRange,
                      colors: ['#4373F0', '#ccc'],
                      min: MIN,
                      max: MAX,
                      rtl
                    }),
                    alignSelf: 'center'
                  }}
                >
                  {children}
                </div>
              </div>
            )
          }}
          renderThumb={({ props, isDragged }: any) => (
            <div
              {...props}
              className='focus:outline-none focus:ring-0 focus:shadow-none'
              style={{
                ...props.style,
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                backgroundColor: '#FFF',
              }}
            >
              <div
                className='relative w-full h-full rounded-full'
                style={{
                  backgroundColor: isDragged ? '#294FB1' : '#4373F0'
                }}
              />
            </div>
          )}
        />
      </div>

      <output id="output" className='min-w-[38px] text-sm font-semibold text-right'>
        {/* {values[0].toFixed(1)} */}
        {convertToPercentage(patternRange[0])}%
      </output>
    </div>
  );
};

export default DzReactRange;