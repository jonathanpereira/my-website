import React, {useState, useEffect} from 'react'
import {Trans, withNamespaces} from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';

import styles from './Intro.module.css'
import {IntroData} from './IntroData'
import * as actions from './IntroActions'

const Intro = ({t}: any) => {
  const introData = IntroData(t)
  const dispatch = useDispatch()
  const [count, setCount]: any = useState(0)
  const [personality, setPersonality]: any = useState(introData)
  const languagesState = useSelector((state: any) => state.languages)

  const clickPicture = () => {
    const limit = introData.length - 1

    count < limit ? setCount(count + 1) : setCount(0)
  }

  const toggleAccentClass = (accent: string) => {
    document.body.className = document.body.className.replace(/accent-\w+/g, '')
    document.body.classList.add(`accent-${accent}`)
  }

  useEffect(() => {
    const personality = introData[count]

    setPersonality(personality)
    toggleAccentClass(personality.accent)

    dispatch(actions.setPersonality(personality))
  }, [count, languagesState])

  return (
    <section className={`section ${styles['section-intro']}`}>
      <div className="section-content">
        <header className={styles.header}>
          <div className={styles.circle} onClick={clickPicture}>
            <img className={styles.picture} src={personality.picture} alt="Gabriel Lima" title="Click Me" />
          </div>

          <h1 className={`${styles.heading} `}>
            <div className={styles.intro}>{t('intro.greeting')}</div>
            <div className={styles.name}>Gabriel Lima</div>
            <div className={`${styles.position}`}>{personality.position}</div>
          </h1>
        </header>

        <div className={styles['bio-wrapper']}>
          <p className={styles['punch-line']}>
            <Trans i18nKey="intro.punch-line">I build things for the web and love what I do.</Trans>
          </p>
          <p className={styles.bio}>
            <Trans i18nKey="intro.bio">
              Mainly focused on
              <strong>Front-end Development</strong> with a good <strong>UI/UX</strong>
              eye and always trying different things.
            </Trans>
            <strong>
              <em className={styles['personality-bio']}> {personality.bio}</em>
            </strong>
          </p>
        </div>
      </div>
    </section>
  )
}

export default withNamespaces()(Intro)
