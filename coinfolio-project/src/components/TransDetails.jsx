
function TransDetails({ transaction, index }) {

    const formattedDate = new Date(transaction.createdAt).toLocaleDateString();
    const formattedTime = new Date(transaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}); 

    console.log('formattedDate:', formattedDate);
    console.log('original date:', transaction.createdAt);
    return (
        <tr key={index} className="divide-solid">
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.id}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2 flex items-center"> {/* Added 'items-center' class */}
                <img src={transaction.coin.image} alt={transaction.coin.name} className="h-8 w-8" />
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.coin.symbol}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.coin.name}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">
                {transaction.transferIn ? 'TransferIn' : 'TransferOut'}
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2">
                {formattedDate} {formattedTime}
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.amount}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">${transaction.amountInUSD.toFixed(2)}</td>
        </tr>
    );
}

export default TransDetails;