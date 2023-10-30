import { create } from 'zustand';

interface NoticeBoardWriteStore {
    noticeBoardNumber: string;
    noticeBoardTitle: string;
    noticeBoardContent: string;
    noticeBoardImage: File | null;
    noticeBoardImageUrl: string | null;

    setNoticeBoardNumber: (noticeBoardNumber: string) => void;
    setNoticeBoardTitle: (noticeBoardTitle: string) => void;
    setNoticeBoardContent: (noticeBoardContent: string) => void;
    setNoticeBoardImage: (noticeBoardImage: File | null) => void;
    setNoticeBoardImageUrl: (noticeBoardImageUrl: string | null) => void;

    resetNoticeBoard: () => void;
}

const useStore = create<NoticeBoardWriteStore>((set) => ({
    noticeBoardNumber: '',
    noticeBoardTitle: '',
    noticeBoardContent: '',
    noticeBoardImage: null,
    noticeBoardImageUrl: '',

    setNoticeBoardNumber: (noticeBoardNumber) => set((state) => ({...state, noticeBoardNumber})),
    setNoticeBoardTitle: (noticeBoardTitle) => set((state) => ({...state, noticeBoardTitle})),
    setNoticeBoardContent: (noticeBoardContent) => set((state) => ({...state, noticeBoardContent})),
    setNoticeBoardImage: (noticeBoardImage) => set((state) => ({...state, noticeBoardImage})),
    setNoticeBoardImageUrl: (noticeBoardImageUrl) => set((state) => ({...state, noticeBoardImageUrl})),

    resetNoticeBoard: () => set((state) => ({ ...state, noticeBoardNumber: '',noticeBoardTitle: '',noticeBoardContent: '', noticeBoardImage: null, noticeBoardImageUrl: null }))
}));

export default useStore;