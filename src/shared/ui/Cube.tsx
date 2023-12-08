export default function Cube({ color }: { color: string }) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="14" viewBox="0 0 71 43" fill="none">
                <path d="M71 42.6H0V15.8136H27.2824V0H71V42.6Z" fill={color} />
            </svg>
        </>
    );
}