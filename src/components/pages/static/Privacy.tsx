import * as React from "react";
import s from "./Static.module.scss";

type Props = {
  id: number;
};

export const Privacy = ({ id }: Props) => {
  switch (id) {
    case 1:
      return (
        <>
          <p>
            Nexus Digital Technology Ltd <strong>(Nexus/we)</strong> respects
            your privacy and is committed to protecting your personal data. This
            privacy notice details how we look after your personal data and what
            your rights are, when you choose to participate in a pilot or trial
            we are performing on behalf of the NHS (each a{" "}
            <strong>Pilot</strong>
            ). You will have been informed about a Pilot by your NHS Trust or
            healthcare provider, but we also request your consent to join the
            Pilot. Your se of the Nexus App B2H <strong>(App)</strong> when
            taking part in the Pilot will also be subject to our{" "}
            <a href="#" target="_blank">
              App End User Licence Agreement <strong>(EULA)</strong>
            </a>
          </p>
          <h3>Health Information:</h3>
          <p>
            We will request information about your health and well-being as part
            of conducting the Pilot. The collection of this sensitive data is
            always subject to your consent and you may control its use at all
            times - see{" "}
            <a href="#" target="_blank">
              Sensitive Data
            </a>
            .
          </p>
          <h3>What is our Role</h3>
          <p>
            Nexus is a data processor on behalf of your NHS Trust and has been
            engaged by them to conduct the Pilot. Therefore, the NHS Trust is
            the Data Controller under data protection law and is responsible for
            determining how and why your personal information is processed. We
            operate under a contract with the NHS Trust which secures protection
            for your personal data.
          </p>
          <p>
            Nexus is also a Data Controller for our own apps, websites and
            services, which will apply if you choose to receive other services
            from us or become a full Nexus account holder.
          </p>
        </>
      );
    case 2:
      return (
        <>
          <p>
            Personal data, or personal information, means any information about
            youfrom which you can be identified. We may collect, use, store and
            transfer different kinds of personal data about you when
            conductingthe Pilot.
          </p>
          <ul className={s.listHeading}>
            <li>
              <h4>Identity Data</h4>
              <p>
                includes first name, maiden name, last name, username or similar
                identifier, marital status, title, date of birth and gender
              </p>
            </li>
            <li>
              <h4>Contact Data</h4>
              <p>includes address, email address and telephone numbers</p>
            </li>
            <li>
              <h4>Profile Data</h4>
              <p>
                includes your NHS number, basic account information; username
                password and access information; response to questionnaires and
                surveys
              </p>
            </li>
            <li>
              <h4>
                Sensitive Data (also known as Special Categories of Personal
                Data)
              </h4>
              <p>
                we will collect information on your health and wellbeing,
                treatments and patient experience, and ethnicity as part of
                conducting the Pilot. We will request your consent to collect
                this when you register for the Pilot and you may withdraw your
                consent at any time.
              </p>
            </li>
          </ul>
          <h3>Nexus App:</h3>
          <p>
            Each time you use our App, we may automatically collect information
            about the device you use, your mobile network and operating system;
            as well as details on how you use our App and participate in the
            pilot.
          </p>
          <h3>Anonymised/Aggregated Data</h3>
          <p>
            We also collect, use and share Anonymised Data.
            <strong>Anonymised Data</strong> could be created from your personal
            data, but is not considered personal data in law because this data
            will <strong>not</strong> directly or indirectly reveal your
            identity. For example, we may monitor usage information of the App
            so as to improve its performance, or review and combine results or
            information obtained from the Pilot on an aggregated and high-level
            basis, which helps us review health and wellbeing needs and patterns
            more widely. For example, we might learn that lots of people with
            one illness also have another condition, live in a certain region or
            have a pattern of behaviour. This anonymous data may be used for
            research purposes or sold to ethical research companies for this
            purpose. This data is always anonymous and you will not be
            identified from it.
          </p>
          <h3>If you fail to provide personal data</h3>
          <p>
            Where we need to collect personal data by law, or in order to
            conduct the Pilot, we may no longer be able to involve you fully in
            all aspects of the Pilot. In this case, we may have to cancel
            participation in the Pilot, but we will notify you if this is the
            case at the time.
          </p>
          <p>How is your personal data collected?</p>
          <p>We receive your personal data:</p>
          <ul>
            <li>
              from the NHS Trust or body which is treating you, so we have the
              relevant background information on your condition or illness, to
              be able to involve you in the Pilot.
            </li>
            <li>
              when you respond to questionnaires, surveys or otherwise provide
              feedback when requested through the App.
            </li>
            <li>
              When we conduct interviews with you, whether in person or
              remotely, in order to better understand your experience of your
              illness/condition; the Pilot and/or the App.
            </li>
            <li>
              When we conduct interviews with clinicians and medical
              practitioners, whether in person or remotely, in order to better
              understand their experience of the Pilot and/or the App, and their
              view on Participants health and well being.
            </li>
            <li>
              When we observe your use of our App (see Technical Information).
            </li>
          </ul>
        </>
      );
    case 3:
      return (
        <>
          <p>
            We rely on your consent to process your personal data, which is
            obtained when you sign up for the Pilot. You may withdraw this
            consent at any time by emailing us at{" "}
            <a href="mailto:admin@nexusdt.com">admin@nexusdt.com</a> In limited
            circumstances we may need to process your data because we are
            required by law or to protect your vital interest.
          </p>
        </>
      );
    case 4:
      return (
        <>
          <p>
            We need your personal data in order to include you in the Pilot and
            otherwise communicate with you.
          </p>
        </>
      );
    case 5:
      return (
        <>
          <p>We may share your personal data with:</p>
          <ul>
            <li>
              Your NHS Trust (as Data Controller) or treatment body to ensure
              all clinical information and results from the Pilot are retained
              by them- this access will be via a secure clinical admin portal
              operated by the Trust and hosted on AWS.
            </li>
            <li>
              Our subcontractor, i2 Media and Research, will be engaged to
              assist with conducting interviews with Participants and
              clinicians. The recordings and outcomes of these interviews will
              be stored on our secure Onedrive and shared with the Trust via
              password protected emails.
            </li>
            <li>
              Third parties to whom we may choose to sell, transfer, or merge
              parts of our business or our assets. Alternatively, we may seek to
              acquire other businesses or merge with them. If a change happens
              to our business, then the new owners may use your personal data in
              the same way as set out in this privacy notice.
            </li>
            <li>
              When we conduct interviews with clinicians and medical
              practitioners, whether in person or remotely, in order to better
              understand their experience of the Pilot and/or the App, and their
              view on Participants health and well being.
            </li>
            <li>
              When we observe your use of our App (see Technical Information).
            </li>
          </ul>
          <p>
            We require all third parties to respect the security of your
            personal data and to treat it in accordance with the law.
          </p>
        </>
      );
    case 6:
      return (
        <>
          <ul>
            <li>
              We will not transfer your personal data outside of the UK or EEA
              (for as long as it has an "adequacy decision" from the UK
              Government) in the course of conducting the Pilot.
            </li>
            <li>
              We will only retain your personal data for the duration of the
              Pilot, or your participation in it, unless you otherwise choose to
              become a Nexus account holder to access our other services. This
              will always be your decision.
            </li>
          </ul>
        </>
      );
    case 7:
      return (
        <>
          <p>
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data. Please note these rights are
            not absolute and may depend on the facts as to how far they apply-
            please contact us for full information:
          </p>
          <h4>Request access</h4>
          <p>
            to your personal data (commonly known as a "data subject access
            request"). This enables you to receive a copy of the personal data
            we hold about you and to check that we are lawfully processing it.
          </p>
          <h4>Request correction</h4>
          <p>
            of the personal data that we hold about you. This enables you to
            have any incomplete or inaccurate data we hold about you corrected.
          </p>
          <h4>Request erasure</h4>
          <p>
            of your personal data. This enables you to ask us to delete or
            remove personal data where there is no good reason for us continuing
            to process it, where it is unlawful, or where you have successfully
            objected to us processing your data.
          </p>
          <h4>Object to processing</h4>
          <p>
            of your personal data where we are relying on a legitimate interest
            (or those of a third party) and there is something about your
            situation which makes you want to object to processing.
          </p>
          <h4>Request restriction of processing</h4>
          <p>
            of your personal data. This enables you to ask us to suspend the
            processing of your personal data in certain scenarios.
          </p>
          <h4>Request the transfer</h4>
          <p>of your personal data to you or to a third party.</p>
          <h4>Withdraw consent at any time</h4>
          <p>
            where we are relying on consent to process your personal data.
            However, this will not affect the lawfulness of any processing
            carried out before you withdraw your consent.
          </p>
        </>
      );
    case 8:
      return (
        <>
          <p>
            If you have any questions about this privacy notice or your rights,
            please contact our Data Privacy Manager/DPO in the following ways:
          </p>
          <h4>Email address:</h4>
          <p>
            <a href="mailto:info@nexus-dt.com">info@nexus-dt.com</a>
          </p>
          <h4>Postal address:</h4>
          <p>
            Data Privacy Manager, Nexus Digital Technology Ltd, L2-8 Ivy
            Business Centre Crown Street, Failsworth, Manchester, England, M35
            9BG
          </p>
          <p>
            You have the right to make a complaint at any time to the
            Information Commissioner's Office (ICO), the UK supervisory
            authority for data protection issues (
            <a href="https://ico.org.uk/" target="_blank">
              www.ico.org.uk
            </a>
            ). We would, however, appreciate the chance to deal with your
            concerns before you approach the ICO so please contact us in the
            first instance.
          </p>
        </>
      );
    default:
      return null;
  }
};
