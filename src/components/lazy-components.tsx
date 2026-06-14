import { lazy } from 'react'

// Lazy load heavy components to reduce initial bundle
export const DetailModal = lazy(() => import('./ui/detail-modal').then(module => ({ default: module.DetailModal })))
export const Lightbox = lazy(() => import('./ui/lightbox').then(module => ({ default: module.Lightbox })))
export const MobileMenu = lazy(() => import('./ui/mobile-menu').then(module => ({ default: module.MobileMenu })))