import PropertyDetails from './PropertyDetails';

const PropertyPage = ({ params }) => {
    console.log("Getting params from page" + params)
    const { id } = params; // Destructure the id from params
    console.log("Gettinf ID from ID" + id)
    return <PropertyDetails id={id} />;
};

export default PropertyPage;
