import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
	remoteName: string
	remotePath: string
	importFunction: () => Promise<any>
}

export default ({ remoteName, remotePath, importFunction }: Props) => {
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

	//? Mount remote MFE
	useEffect(() => {
		if (!isFirstRunRef.current) return
		getMount()
	}, [location])

	async function getMount() {
		const mount = await importFunction().then((module) => module.mount)
		unmountRef.current = mount({
			mountPoint: wrapperRef.current!,
			initialPathname: location.pathname.replace(remotePath, '')
		})
		isFirstRunRef.current = false
	}

	return (
		<div
			ref={wrapperRef}
			id={`${remotePath}-mfe`}
		/>
	)
}
