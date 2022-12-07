import { BreakpointEnums } from "@App/enums/breakpointEnums"
import confetti from "canvas-confetti"
import type { MutableRefObject} from "react";
import { useCallback, useEffect, useState } from "react"
import useSite from "./useSite"

const confettiConfig = {
  mobile: {
    count: 400,
    origin: {
      y: .9,
      x: .5
    },
    scalar: 1,
    spread: {
      a: 50,
      b: 60,
      c: 100
    },
    velocity: {
      a: 55,
      b: 25,
      c: 45
    }
  },
  tablet: {
    count: 400,
    origin: {
      y: .7,
      x: .5
    },
    scalar: 1.7,
    spread: {
      a: 200,
      b: 300,
      c: 100
    },
    velocity: {
      a: 55,
      b: 25,
      c: 45
    }
  },
  desktop: {
    count: 1600,
    origin: {
      y: 1,
      x: .5
    },
    scalar: 1.5,
    spread: {
      a: 150,
      b: 40,
      c: 120
    },
    velocity: {
      a: 125,
      b: 95,
      c: 105
    }
  }
}
export function useConfettiDeviceParams({ref}: {ref: MutableRefObject<HTMLCanvasElement | null>}) {

  const { state: { breakpoint, breakpointLoaded } } = useSite()
  const [state, setState] = useState({
    loaded: false,
    confettiParams: confettiConfig.desktop,
  })

  const confettiTest = useCallback((params: any) => {


    if (!ref.current) {
      return
    }

    var myConfetti = confetti.create(ref.current, { resize: true });
    var count = params.count;
    var defaults = {
      origin: params.origin
    };

    function fire(particleRatio: number, opts: any) {
      myConfetti(Object.assign({}, defaults, opts,
        {
          scalar: params.scalar,
          particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
      spread: params.spread.a,
      // startVelocity: 55,
      startVelocity: params.velocity.a,
    });
    fire(0.2, {
      spread: params.spread.b,
    });
    fire(0.35, {
      spread: params.spread.c,
      decay: .91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      // startVelocity: 25,
      startVelocity: params.velocity.b,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      // startVelocity: 45,
      startVelocity: params.velocity.c,
    });
  },[ref])

  useEffect(() => {
    if(!breakpointLoaded){
      return
    }
    if (breakpoint === BreakpointEnums.mobile) {
      setState({
        loaded: true,
        confettiParams: confettiConfig.mobile
      })
    } else if (breakpoint === BreakpointEnums.tablet) {
      setState({
        loaded: true,
        confettiParams: confettiConfig.tablet
      })
    } else {
      setState({
        loaded: true,
        confettiParams: confettiConfig.desktop
      })
    }

  }, [breakpoint, breakpointLoaded])

  useEffect(() => {
    if (breakpointLoaded && state.loaded){
      confettiTest(state.confettiParams)
    }
    // if (breakpointLoaded && !state.loaded) {
    //   console.log('call confetti',state)
    //   confettiTest(state.confettiParams)
    //   setState({
    //     ...state,
    //     loaded: true,
    //   })
    // }

  }, [breakpointLoaded, confettiTest, state])

  return {state}
}