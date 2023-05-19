import React, { useEffect, useRef, useState } from "react"
import "./Landing.css"
import FeatureShowcase from "./FeatureShowcase"
import { Box, Typography } from "@mui/material"

function Landing() {
  const [isVisible, setIsVisible] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
  })
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries)
        entries.forEach((entry) => {
          const { target, isIntersecting } = entry
          const sectionId = target.getAttribute("id")
          setIsVisible((prevState) => ({
            ...prevState,
            [sectionId]: isIntersecting,
          }))
        })
      }
      // {
      //   threshold: 1.0,
      // }
    )

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const sampleData = {
    title: "test",
    description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit
      amet sagittis lorem, sed lobortis leo. In ornare tristique turpis sed
      hendrerit. Donec vitae porttitor turpis. Sed maximus, sem in aliquet
      maximus, mi diam fringilla dolor, ac faucibus nulla sem sit amet elit.
      Aliquam eros turpis, dictum sit amet lorem id, malesuada imperdiet
      ante. Vestibulum id maximus felis. Nullam non nisi purus. Aliquam vel
      accumsan sem. Vestibulum elementum dolor vitae aliquam aliquet. Cras
      lobortis finibus tincidunt. Duis eget dapibus neque.`,
  }
  return (
    <div>
      <Box className="hero">
        <Typography variant="h1">TITLE</Typography>
      </Box>
      <section
        id="section1"
        className={`hidden ${isVisible["section1"] ? "show" : ""}`}
        ref={sectionRefs[0]}
      >
        <FeatureShowcase
          title={sampleData.title}
          description={sampleData.description}
          type="right"
        />
      </section>
      <section
        id="section2"
        className={`hidden ${isVisible["section2"] ? "show" : ""}`}
        ref={sectionRefs[1]}
      >
        <FeatureShowcase
          title={sampleData.title}
          description={sampleData.description}
          type="left"
        />
      </section>
      <section
        id="section3"
        className={`hidden ${isVisible["section3"] ? "show" : ""}`}
        ref={sectionRefs[2]}
      >
        <FeatureShowcase
          title={sampleData.title}
          description={sampleData.description}
          type="right"
        />
      </section>
      <section
        id="section4"
        className={`hidden ${isVisible["section4"] ? "show" : ""}`}
        ref={sectionRefs[3]}
      >
        <FeatureShowcase
          title={sampleData.title}
          description={sampleData.description}
          type="left"
        />
      </section>
    </div>
  )
}

export default Landing
