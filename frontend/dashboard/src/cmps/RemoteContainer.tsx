import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
	cmpName: string
	remotePath: string
	mount: any
}

export default ({ cmpName: remoteName, remotePath, mount }: Props) => {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()
	const location = useLocation()

	//? Listen to navigation events dispatched inside remote mfe.
	useEffect(() => {
		const remoteNavigationEventHandler = (event: Event) => {
			const pathname = (event as CustomEvent<string>).detail
			const newPathname = `${remotePath}${pathname}`
			if (newPathname === location.pathname) {
				return
			}
			navigate(newPathname)
		}
		window.addEventListener(`[${remoteName}] navigated`, remoteNavigationEventHandler)

		return () => {
			window.removeEventListener(`[${remoteName}] navigated`, remoteNavigationEventHandler)
		}
	}, [location])

	//? Listen for shell location changes and dispatch a notification.
	useEffect(() => {
		if (location.pathname.startsWith(remotePath)) {
			window.dispatchEvent(
				new CustomEvent('[dashboard] navigated', {
					detail: location.pathname.replace(remotePath, '')
				})
			)
		}
	}, [location])

	const isFirstRunRef = useRef(true)
	const unmountRef = useRef(() => {})
	// Mount app1 MFE
	useEffect(() => {
		if (!isFirstRunRef.current) {
			return
		}
		unmountRef.current = mount({
			mountPoint: wrapperRef.current!,
			initialPathname: location.pathname.replace(remotePath, '')
		})
		isFirstRunRef.current = false
	}, [location])

	useEffect(() => unmountRef.current, [])

	return (
		<div
			ref={wrapperRef}
			id={`${remotePath}-mfe`}
		/>
	)
}
