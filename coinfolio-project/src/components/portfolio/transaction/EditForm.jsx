
const EditAPIUrl = "http://localhost:3001/transaction/";

export default function EditForm( { transaction, onCancel } ) {

    function handleSubmit(e) {
        e.preventDefault();
        // call the getLatLng function with the city name entered by the user
        getLatLng(city);
    }

    return (
        <div className="modal rounded-2xl">
            <form onSubmit={handleSubmit}>
                {/* ... all your form inputs and fields */}
                <p>{transaction}</p>
                <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit">
                    Submit
                </button>
            </div>
            </form>
        </div>
    );
}