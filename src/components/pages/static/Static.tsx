import { Button } from "components/common/Button/Button";
import { Header } from "components/layouts/Header/Header";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import s from "./Static.module.scss";
import cn from "classnames";
import { Link, Element } from "react-scroll";
import { Privacy } from "./Privacy";
import { Terms } from "./Terms";
import { Heading, Pages, privacy, terms } from "const";

interface IProps {
  page: string;
}

export const Static = ({ page }: IProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const renderPage = (page: string, id: number) => {
    switch (page) {
      case Pages.privacy:
        return <Privacy id={id} />;
      case Pages.terms:
        return <Terms id={id} />;
      default:
        return null;
    }
  };

  const getPageContent = () => {
    switch (page) {
      case Pages.privacy:
        return privacy;
      case Pages.terms:
        return terms;
      default:
        return [];
    }
  };

  const getPageHead = () => {
    switch (page) {
      case Pages.privacy:
        return Heading.privacy;
      case Pages.terms:
        return Heading.terms;
      default:
        return null;
    }
  };

  const pageContent = getPageContent();

  return (
    <>
      <Header isStatic className="static">
        <Button
          filled="invisible"
          value="Back"
          icon="arrow-back"
          onClick={handleBack}
          className={s.backBtn}
        />
      </Header>
      <div
        id="container"
        className={cn("container", "scroll-parent", s.static)}
      >
        <h1>{getPageHead()}</h1>
        <div className={s.container}>
          <div className={s.navigation}>
            <nav className={s.navWrap}>
              <ul className={s.navList}>
                {pageContent.map(({ id, title }) => {
                  return (
                    <li key={id} className={s.navItem}>
                      <Link
                        activeClass={s.active}
                        to={`id-${id}`}
                        spy={true}
                        smooth={true}
                        duration={500}
                        containerId="container"
                        offset={10}
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className={s.content}>
            {pageContent.map(({ id, title }) => {
              return (
                <Element key={id} name={`id-${id}`} className={s.row}>
                  <h2 className={s.title}>{title}</h2>
                  <div className={s.chapterContent}>{renderPage(page, id)}</div>
                </Element>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
