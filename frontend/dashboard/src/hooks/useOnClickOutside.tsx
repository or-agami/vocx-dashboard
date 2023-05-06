import React from 'react'
import { MutableRefObject, useEffect } from 'react'

//? Hook for event trigger in click outside of element
export default function useOnClickOutside(ref: MutableRefObject<HTMLDivElement | null> ,handler: CallableFunction) {
	useEffect(() => {
		const listener = (event: any) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target as Node)) return

			handler(event)
		}

		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}
