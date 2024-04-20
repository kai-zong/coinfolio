
function TransDetails({ transaction, index }) {
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
                {new Date(transaction.date).toLocaleDateString()}
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.amount}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">${transaction.amountInUSD.toFixed(2)}</td>
        </tr>
    );
}

export default TransDetails;