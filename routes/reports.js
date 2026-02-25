const express = require('express');
const router = express.Router();

let reports = [];

router.get('/', (req, res) => {
    res.json(reports);
});

router.get('/:id', (req, res) => {
    const report = reports.find(r => r.id === parseInt(req.params.id));
    if (!report) return res.status(404).send('Report not found');
    res.json(report);
});

router.post('/', (req, res) => {
    const { id, title, type, generatedAt } = req.body;
    const newReport = { id, title, type, generatedAt: generatedAt || new Date(), data: [] };
    reports.push(newReport);
    res.status(201).json(newReport);
});

router.put('/:id', (req, res) => {
    const report = reports.find(r => r.id === parseInt(req.params.id));
    if (!report) return res.status(404).send('Report not found');
    Object.assign(report, req.body);
    res.json(report);
});

router.delete('/:id', (req, res) => {
    const reportIndex = reports.findIndex(r => r.id === parseInt(req.params.id));
    if (reportIndex === -1) return res.status(404).send('Report not found');
    reports.splice(reportIndex, 1);
    res.status(204).send();
});

module.exports = router;