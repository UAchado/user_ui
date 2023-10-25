const ItemList = () => {

    const data = [
        {
            image: "https://media.discordapp.net/attachments/852109272262770710/1166749106669113364/image.png?ex=654b9ec8&is=653929c8&hm=aec89d9d26f98897dc949faddfa3537b4c1bebd136e6e8c445268c530a96e059&=&width=2824&height=1392",
            description: "Carteira preta",
            tag: "Carteiras",
            dropoffPoint_id: "1234"
        },
    ];
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Tags</th>
                            <th>Pickup Point</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 mask mask-squircle">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.description}</div>                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-2">
                                        <span className="badge badge-ghost badge-md">{item.tag}</span>
                                    </div>
                                </td>
                                <td>{item.dropoffPoint_id}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemList;

