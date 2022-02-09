import DrawerComponent from "./DrawerComponent";

const InBetweenComponent = () => {
  return (
    <div>
      <h3>I'm just a component in between the App and the Drawer.</h3>
      <p>
        I'm the intermediary component InbetweenComponent.js. I don't need any
        data from my parent container at all.
      </p>
      <DrawerComponent />
    </div>
  );
};

export default InBetweenComponent;
