import json from "../../../public/TimeLineData.json";
import "./AllRelease.css";
interface props {
  setSelected: Function;
  selected: number;
}
export const AllRelease = ({ setSelected, selected }: props) => {
  return (
    <div className="ListReleases">
      <h2>All release notes</h2>
      <div className="Container_Releses">
        {json.release.map((real, index) => (
          <div
            className="relese"
            style={{
              fontSize: selected === index ? "1px solid black" : "",
              color: selected === index ? "black" : "#7D879C",
            }}
            onClick={() => setSelected(index)}
          >
            {real.Title}:{real.subTitle}
          </div>
        ))}
      </div>
    </div>
  );
};
