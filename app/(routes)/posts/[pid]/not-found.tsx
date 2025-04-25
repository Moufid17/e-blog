import Image from "next/image"
 
export default function NotFound() {
    return (
        <div style={{ display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", minHeight: "91vh", margin: 20}}>
            <div style={{ position: "relative", width: 150, height: 250, margin: -50, marginTop: -200}}>
                <Image src="/appIcon-black.svg" alt="logo" loading="lazy" fill/>
            </div>
            <div style={{ display: "flex"}}>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}><h1 style={{ fontSize: "2rem" }}>404</h1></div>
                <div style={{display: "flex"}}>
                    <div style={{borderLeft:"1px solid #000", marginInline: 15}}></div>
                    <div>
                        <p style={{ fontSize: "1rem", textAlign: "left"}}>Not Found</p>
                        <p style={{ fontSize: "1.5rem", color: "#000" }}>Oops! The post you are looking for does not exist.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}