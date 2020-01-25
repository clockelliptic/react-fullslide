/* **********************************************
 * CodeSnippet
 */
export const CodeSnippet = styled.code`
    background: rgba(0,0,0,0.1)
`;

/* **********************************************
 * CodeBlock
 */

const PreCode = ({children}) => (<div><pre><code>{children}</code></pre></div>)
const Block = styled.div`
        display: block;
        padding: 1em 1em;
        background: rgba(0,0,0,0.05);
        color: #444;
        white-space: pre;
        overflow-x: scroll;
    `;


export const CodeBlock = ({children}) => (<Block><PreCode>{children}</PreCode></Block>);


/* **********************************************
 * Col
 */

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    ${
        props => {
            switch(props.color){
                case 'mid':
                    return (`
                        background: rgba(145,165,185,1.0);
                    `);
                case 'light':
                    return (`
                        background: rgba(255,255,255,1.0);
                    `);
                case 'dark':
                    return (`
                        background: rgba(195,215,235,1.0);
                    `);
            }
        }
    }
`;


/* **********************************************
 * Box
 *
 *  Prevents scroll propagatin within (normal) scrollable overflow containers.
 *  unless user has scrolled to the bottom of the overflow container.
 *
 */

const BoxContainer = styled.div`
    display: ${props => props.flex ? 'flex' : 'block'};
    overflow-x: hidden;
    height: 100vh;
    align-items: center;
    justify-content: flex-start;
`;

const BoxContent = styled.div`
    position: relative;
    padding: 2% 4% 8% 4%;
    width: 96%%;
`;

const DetectBottom = styled.div`
    position: absolute;
    bottom: 0;
    width: 10%;
    height: 1px;
    background-color: rgba(0,0,0,50.1);

`;

const Box = ({children, flex}) => {
    const boxId = `boxContainer${Math.floor(Math.random()*1000)}${new Date().getTime()}`

    const status = useRef({
        atBottom: false,
    })

    function on_bottomDetected (entries, observer) {
        status.current.atBottom = true
        console.log(entries)
    }

    let options = {
        root: document.getElementById(`content_${boxId}`),
        rootMargin: '0px',
        threshold: 0,
    }

    let observer = new IntersectionObserver(on_bottomDetected, options)

    useEffect(() => {

        const onWheel = (e) => {
            console.log("wheel detected")
            if (status.current.atBottom){
                console.log('at the bottom!')
            } else {
                console.log('not at the bottom')
                e.stopPropagation()
                status.current.atBottom = false;
            }
        }

        try {
            observer.observe(document.getElementById(boxId))
            document.getElementById(boxId).addEventListener('wheel', onWheel)
        } catch (err) {
            console.error(err)
        }
        return(() => {
            try {
                document.getElementById(boxId).removeEventListener('wheel', onWheel)
            } catch {}
        })
    })

    return(
        <BoxContainer id={boxId} flex={flex}>
            <BoxContent id={`content_${boxId}`}>
                <DetectBottom id={`bottom_${boxId}`} />
                {
                    children
                }
            </BoxContent>
        </BoxContainer>
    );
}