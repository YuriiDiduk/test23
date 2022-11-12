
import { Header } from 'components/layouts/Header/Header';
import * as React from 'react';
import cn from "classnames";
import s from "./Dashboard.module.scss";
import { ChartBlock } from './ChartBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAgesAction, getEthnicitiesAction, getPatientsAmountAction } from 'actions/patientsActions';
import { makeSelector } from 'helpers';
import { IAgesResponse } from 'interfaces';

const Dashboard = () => {
  const patientsAmount: IAgesResponse = useSelector(
    makeSelector(["patientsReducer", "patientsAmount"])
  );

  const ethnicities: IAgesResponse = useSelector(
    makeSelector(["patientsReducer", "ethnicities"])
  );

  const ages: IAgesResponse = useSelector(
    makeSelector(["patientsReducer", "ages"])
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientsAmountAction(null));
    dispatch(getEthnicitiesAction(null));
    dispatch(getAgesAction(null));
  }, []);

  const ethnicitiesArray = Object.entries(ethnicities);
  const dataEthnicities = ethnicitiesArray.map((row) => {
    return {
      label: row[0],
      value: row[1].count,
    }
  });

  const agesArray = Object.entries(ages);

  const dataAges = agesArray.map((row) => {
    return {
      label: row[0],
      value: row[1],
    };
  });

  return (
    <>
      <Header>
        <h1>Dashboard</h1>
      </Header>
      <div className="container scroll-parent">
        <div className={cn(s.bgBlock, "bg-block")}>
          <h2>
            Number of patients using Nexus&nbsp;App:
            <span className="h1">&nbsp;&nbsp;{patientsAmount}</span>
          </h2>
        </div>
        <div className={cn(s.chartsWrap, "scroll")}>
          <div className={s.charts}>
            <ChartBlock
              title="Patient Ethnicity"
              name="ethnicity"
              data={dataEthnicities}
            />
            <ChartBlock
              title="Patient Age (years)"
              name="age"
              data={dataAges}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;