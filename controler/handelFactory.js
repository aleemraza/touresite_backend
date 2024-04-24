exports.getOne = (Model, popOptions) =>
    async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
        res.status(404).json({
            status: 'failed',
            message:"No document found with that ID"
          });
      
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  };