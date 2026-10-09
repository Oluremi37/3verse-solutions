import "./Partners.css";
import logitech from "../../assets/images/logitech.png";
import cisco from "../../assets/images/cisco.png";
import poly from "../../assets/images/poly.png";
import huawei from "../../assets/images/huawei.png";
import avaya from "../../assets/images/avaya.png";
import microsoft from "../../assets/images/microsoft.png";
import ibm from "../../assets/images/ibm.png";
import dell from "../../assets/images/dell.png";
import samsung from "../../assets/images/samsung.png";

const partners = [
  { name: "Logitech", logo: logitech },
  { name: "Cisco", logo: cisco },
  { name: "Poly", logo: poly },
  { name: "Huawei", logo: huawei },
  { name: "Avaya", logo: avaya },
  { name: "Microsoft", logo: microsoft },
  { name: "IBM", logo: ibm },
  { name: "Dell", logo: dell },
  { name: "Samsung", logo: samsung },
];

const Partners = () => {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <div className="partners-header">
          <span className="partners-tag">Our Partners</span>
          <h2>Trusted by global technology leaders</h2>
          <p>
            Partnering with leading brands to deliver innovative, secure and
            scalable communication solutions.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner) => (
            <div className="partner-logo" key={partner.name}>
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
