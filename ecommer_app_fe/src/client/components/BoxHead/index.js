
function BoxHead(props) {
    const {text} = props
    return (
        <>
            <div className=" mb-6 mt-6">
                <h2 className="mb-0 text-[32px] font-semibold text-green-600">{text}</h2>
            </div>
        </>
    );
}

export default BoxHead;