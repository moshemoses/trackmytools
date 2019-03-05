import { connect } from "react-redux";
import React from "react";
import { removeToolFromCollection } from "../store";

const DisplayTools = props => {
  const { tools, updateSection } = props;
  const formSub = () => {};
  if (Array.isArray(tools) && tools.length > 0) {
    return (
      <div>
        <h2 className="homer">Your Tools</h2>
        <table className="centered highlight response-table">
          <tbody>
            <tr>
              <th />
              <th>Tool Type</th>
              <th>ID details</th>
              <th>Manufacturer</th>
              <th>Age</th>
              <th>Condition</th>
              <th>Power Source</th>
              <th>Accessories</th>
              <th>Loan Status </th>
              <th>comments</th>
            </tr>
            {tools.map(tool => {
              return (
                <tr>
                  <td>
                    <button
                      onClick={() => {
                        props.removeTool(tool.id);
                      }}
                    >
                      X
                    </button>
                  </td>
                  <td
                    onClick={updateSection}
                    className={`left-align toolType ${tool.id}`}
                  >
                    {tool.toolType}
                  </td>
                  <td
                    onClick={updateSection}
                    className={`specificIdentifyingDetails ${tool.id}`}
                  >
                    {tool.specificIdentifyingDetails}
                  </td>
                  <td
                    onClick={updateSection}
                    className={`manufacturer ${tool.id}`}
                  >
                    {tool.manufacturer}
                  </td>
                  <td
                    onClick={updateSection}
                    className={`approximateAge ${tool.id}`}
                  >
                    {tool.approximateAge}
                  </td>
                  <td
                    onClick={updateSection}
                    className={`condition ${tool.id}`}
                  >
                    {tool.condition}
                  </td>
                  <td onClick={updateSection} className={`powered ${tool.id}`}>
                    {tool.powered}
                  </td>
                  <td
                    onClick={updateSection}
                    className={`accessories ${tool.id}`}
                  >
                    {tool.accessories}
                  </td>
                  <td
                    onClick={updateSection}
                    className={`loanStatus ${tool.id}`}
                  >
                    {tool.loanStatus}
                  </td>
                  <td onClick={updateSection} className={`comments ${tool.id}`}>
                    {tool.comments}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>No tools found here yet...</div>;
  }
};

const mapStateToProps = state => {
  return {
    tools: state.tools
  };
};

const mapDispatchToProps = dispatch => ({
  removeTool: toolId => dispatch(removeToolFromCollection(toolId)),
  formSub: () => {},
  updateSection: () => {
    console.log(event);

    const category = event.target.className;
    console.log(category);
    event.target.outerText = <TestComp />;
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayTools);
