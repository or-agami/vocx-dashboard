import React from 'react'
import { useAtom } from 'jotai'
import { openModalAtom } from '../store/event.atom'
import { AiFillCloseCircle } from 'react-icons/ai'
import useOnClickOutside from '../hooks/useOnClickOutside'
import { type LazyExoticComponent, Suspense, useRef } from 'react'
import '../styles/cmps/ModalDialog.scss'

export type LazyCmp = LazyExoticComponent<() => JSX.Element> | 'none'

export default function ModalDialog() {
	const ref = useRef<HTMLDivElement>(null)
	const [LazyCmp, setModal] = useAtom(openModalAtom)

	useOnClickOutside(ref, () => setModal('none'))

	if (LazyCmp === 'none') return <></>
	return (
		<div className="modal-dialog-container">
			<div
				ref={ref}
				className="modal-dialog">
				<button
					className="btn btn-svg btn-close"
					title="C;lose"
					onClick={() => setModal('none')}>
					<AiFillCloseCircle size="18px" />
				</button>
				<Suspense>
					<LazyCmp />
				</Suspense>
			</div>
		</div>
	)
}
